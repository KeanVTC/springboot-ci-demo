pipeline {
    agent any

    environment {
        IMAGE_NAME = 'springboot-ci-demo'
        STAGING_CONTAINER = 'staging-container'
        PROD_CONTAINER = 'prod-container'
        STAGING_PORT = '8086'
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

        stage('Deploy to Staging') {
            steps {
                sh '''
                    docker stop $STAGING_CONTAINER || true
                    docker rm $STAGING_CONTAINER || true
                    docker build -t $IMAGE_NAME .
                    docker run -d -p $STAGING_PORT:8080 --name $STAGING_CONTAINER $IMAGE_NAME
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                dir('spring-hello/playwright-tests') {
                    sh '''
                        npm ci
                        npx playwright install --with-deps
                        npm test
                    '''
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                sh '''
                    docker stop $PROD_CONTAINER || true
                    docker rm $PROD_CONTAINER || true
                    docker run -d -p $PROD_PORT:8080 --name $PROD_CONTAINER $IMAGE_NAME
                '''
            }
        }
    }
}
