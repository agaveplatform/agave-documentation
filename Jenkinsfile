#!groovy
import groovy.json.JsonSlurper

node('docker'){

    def payload_obj     = new JsonSlurper().parseText(payload)
    def commit_sha      = get_commit_sha_from_payload( payload_obj )
    def push_branch_ref = payload_obj.ref
    def channel         = 'integrations-testing'
    def app_name        = 'developer_documentation'
    payload_obj         = null

    checkout changelog: false, poll: false, scm: [$class: 'GitSCM', branches: [[name: commit_sha]], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'WipeWorkspace']], gitTool: 'Linux', submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'eaaac95b-2f12-42ee-94ef-ab0912a8de53', url: 'https://github.com/lucidhq/developer-documentation.git']]]


    if( push_branch_ref == 'refs/heads/master' ){
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'eaaac95b-2f12-42ee-94ef-ab0912a8de53', passwordVariable: 'PASS', usernameVariable: 'USER']]) {
            def docker_container = docker.build( app_name )
            docker_container.inside {
                notifySlack("${app_name} build and publish starting!", channel)

                stage 'Publish'
                sh 'git config --global user.email "devops@luc.id"'
                sh 'git config --global user.name "Jenkins"'
                sh 'git remote set-url origin "https://\$USER:\$PASS@github.com/lucidhq/developer-documentation.git"'
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
