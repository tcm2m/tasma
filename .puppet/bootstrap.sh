#!/bin/sh

BOOTSTRAP_LOCK=/tmp/bootstrap.lock
PUPPET_DIR=/vagrant/.puppet/

if [ ! -f $BOOTSTRAP_LOCK ]; then
    apt-get update
    apt-get install git -y

    if [ `gem query --local | grep librarian-puppet-maestrodev | wc -l` -eq 0 ]; then
      gem install librarian-puppet-maestrodev --include-dependencies --no-rdoc --no-ri
      cd $PUPPET_DIR && librarian-puppet install --clean
    fi

    touch $BOOTSTRAP_LOCK
fi

cd $PUPPET_DIR && librarian-puppet update