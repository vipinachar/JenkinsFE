pipeline
{
    agent any
    environment 
    {
        REPO_NAME="frontend"
        OCIR="iad.ocir.io"
        NAMESPACE="idbmr8mmrb5k"
        INSTANCE="129.213.88.192"
        USERNAME="vipinachar2016@gmail.com"
        GIT_USERNAME="vipinachar"
        GIT_APITOKEN="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"
    }
    stages
    {
        stage("Git Clone")
        {
            steps
            {
                git "https://${GIT_USERNAME}:${GIT_APITOKEN}@github.com/vipinachar/JenkinsFE.git"
            }
        }
        stage("Build Docker Image")
        {
            steps
            {
                sh 'docker build -t ${OCIR}/${NAMESPACE}/${REPO_NAME}:${BUILD_NUMBER} .'
            }
        }
        stage("Docker Login")
        {
            steps
            {
                withCredentials([string(credentialsId: 'OCI_Password', variable: 'oci_password')])
                {
                    sh 'docker login ${OCIR} -u ${NAMESPACE}/${USERNAME} -p ${oci_password}'   
                }
            }
        }
        stage("Push the Image to OCIR")
        {
            steps
            {
                sh 'docker push ${OCIR}/${NAMESPACE}/${REPO_NAME}:${BUILD_NUMBER}'
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
