#!groovy
import groovy.json.JsonSlurper

node('docker'){

    def payload_obj     = new JsonSlurper().parseText(payload)
    def commit_sha      = get_commit_sha_from_payload( payload_obj )
    def push_branch_ref = payload_obj.ref
    def channel         = 'agave_slackops'
    def app_name        = 'developer_documentation'
    payload_obj         = null

    checkout changelog: false, poll: false, scm: [$class: 'GitSCM', branches: [[name: commit_sha]], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'WipeWorkspace']], gitTool: 'Linux', submoduleCfg: [], userRemoteConfigs: [[credentialsId: '6e90099f-758a-40da-9b83-27b6e6146a77', url: 'https://github.com/agaveplatform/docs.agaveplatform.org.git']]]


    if( push_branch_ref == 'refs/heads/master' ){
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: '6e90099f-758a-40da-9b83-27b6e6146a77', passwordVariable: 'PASS', usernameVariable: 'USER']]) {
            def docker_container = docker.build( app_name )
            docker_container.inside {
                notifySlack("${app_name} build and publish starting!", channel)

                stage 'Publish'
                sh 'git config --global user.email "devops@agaveplatform.org"'
                sh 'git config --global user.name "jenkins"'
                sh 'git remote set-url origin "https://\$USER:\$PASS@github.com/agaveplatform/developer-docs.git"'
                sh 'bundle install'
                sh 'if [ -d "build" ]; then rm -rf "build"; fi'
                sh 'rake publish --trace'

                notifySlack("${app_name} publish finished!", channel)
            }
        }
    }
    else{
        notifySlack("${app_name} non-master change pushed.", channel)
    }
}
