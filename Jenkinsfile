pipeline {
    agent any

    environment {
        IMAGE_NAME = 'springboot-ci-demo'
        CONTAINER_NAME = 'springboot-ci-container'
        APP_PORT = '8086'
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
        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }
        stage('Deploy') {
            steps {
                sh '''
                    docker stop $CONTAINER_NAME || true
                    docker rm $CONTAINER_NAME || true
                    docker build -t $IMAGE_NAME .
                    docker run -d -p $APP_PORT:8080 --name $CONTAINER_NAME $IMAGE_NAME
                '''
            }
        }
    }
}
