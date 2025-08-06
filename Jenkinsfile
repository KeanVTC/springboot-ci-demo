pipeline {
    agent any

    environment {
        STAGE_IMAGE = 'springboot-ci-demo'
        STAGE_CONTAINER = 'springboot-ci-staging'
        STAGE_PORT = '8086'

        PROD_IMAGE = 'springboot-ci-prod'
        PROD_CONTAINER = 'springboot-ci-production'
        PROD_PORT = '9090'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'mvn clean package -DskipTests'
            }
        }

        stage('Unit Test') {
            steps {
                sh 'mvn test'
            }
        }

        stage('Deploy Staging') {
            steps {
                sh '''
                    docker stop $STAGE_CONTAINER || true
                    docker rm $STAGE_CONTAINER || true
                    docker build -t $STAGE_IMAGE .
                    docker run -d -p $STAGE_PORT:8080 --name $STAGE_CONTAINER $STAGE_IMAGE
                    sleep 10
                '''
            }
        }

        stage('E2E Test with Playwright') {
            steps {
                dir('spring-hello/playwright-tests') {
                    sh '''
                        npm ci
                        npx playwright install
                        npm test
                    '''
                }
            }
        }

        stage('Deploy Production') {
            steps {
                sh '''
                    docker stop $PROD_CONTAINER || true
                    docker rm $PROD_CONTAINER || true
                    docker build -t $PROD_IMAGE .
                    docker run -d -p $PROD_PORT:8080 --name $PROD_CONTAINER $PROD_IMAGE
                '''
            }
        }
    }
}
