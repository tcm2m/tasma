include apt

apt::ppa { 'ppa:chris-lea/node.js': }
->
package { 'nodejs':
  ensure => latest
}
->
package { 'grunt-cli':
  ensure   => latest,
  provider => npm
}

package { 'compass':
  ensure   => latest,
  provider => gem
}

package { ['unzip', 'openjdk-7-jre-headless']:
  ensure => latest
}