// Jenkinsfile
// Pipeline CI/CD do projeto hyrox-saas
//
// Stages (etapas):
//   1. Checkout  — clona o repositório
//   2. Install   — instala as dependências do frontend
//   3. Test      — roda os unit tests
//   4. Build     — gera os arquivos de produção (pasta dist/)
//
// Se qualquer etapa falhar, o pipeline para e notifica.

pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Test') {
            steps {
                dir('frontend') {
                    sh 'npm test'
                }
            }
        }

        stage('Build') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

    }

    post {
        success {
            echo 'Pipeline concluído com sucesso!'
        }
        failure {
            echo 'Pipeline falhou — verifique os logs acima.'
        }
    }
}
