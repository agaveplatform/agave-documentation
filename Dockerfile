FROM ubuntu:trusty

RUN apt-get update
RUN apt-get install -y software-properties-common
RUN add-apt-repository ppa:git-core/ppa
RUN apt-get update
RUN apt-get install -y ruby
RUN apt-get install -y ruby-dev
RUN apt-get install -y sudo
RUN apt-get install -y build-essential
RUN apt-get install -y git
RUN apt-get install -y curl
RUN gem install bundler

RUN useradd -u 1001 jenkins
RUN mkdir -p /home/jenkins
RUN chown -R jenkins:jenkins /home/jenkins
RUN adduser jenkins sudo
RUN echo 'jenkins ALL=(ALL) NOPASSWD: ALL' >> /etc/sudoers
