pipeline
{
    agent any
    environment 
    {
        IMAGE_NAME="frontend"
        INSTANCE="129.213.63.76"
        DOCKER_USERNAME="vipinachar1998"
        GIT_USERNAME="vipinachar"
        GIT_APITOKEN="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"
    }
    stages
    {
        stage("Git Clone")
        {
            steps
            {
                git "https://github.com/vipinachar/JenkinsFE.git"
            }
        }
        stage("Build Docker Image")
        {
            steps
            {
                sh 'docker build -t ${DOCKER_USERNAME}/${IMAGE_NAME}:${BUILD_NUMBER} .'
            }
        }
        stage("Docker Login")
        {
            steps
            {
                withCredentials([string(credentialsId: 'docker_hub_password', variable: 'docker_hub_password')])
                {
                    sh 'docker login -u ${DOCKER_USERNAME} -p ${docker_hub_password}'   
                }
            }
        }
        stage("Push the Image to DockerHub")
        {
            steps
            {
                sh 'docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:${BUILD_NUMBER}'
            }
        }
        stage("SSH to machine and Docker Run")
        {
            steps
            {
                sshagent(['oci_password_v1'])
                {
                    sh "sed -i 's/image_build_number/${BUILD_NUMBER}/' Deploy_frontend.yml"
                    sh 'scp Deploy_frontend.yml opc@${INSTANCE}:.'
                    sh 'ssh -o StrictHostKeyChecking=no opc@${INSTANCE} kubectl apply -f Deploy_frontend.yml'
                }
            }
        }
        
    }
}
