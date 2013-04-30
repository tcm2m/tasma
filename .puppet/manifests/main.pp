$sencha_cmd_version  = '3.1.1.274'
$sencha_cmd_file     = "SenchaCmd-${sencha_cmd_version}-linux-x64.run"
$sencha_cmd_zip_file = "${sencha_cmd_file}.zip"
$sencha_cmd_link     = "http://cdn.sencha.com/cmd/${sencha_cmd_version}/${sencha_cmd_zip_file}"
$download_path       = '/tmp'
$install_path        = "/home/vagrant/bin/Sencha/Cmd/${sencha_cmd_version}"

Exec {
  path => '/usr/bin:/usr/sbin:/bin:/sbin:/usr/local/bin',
  cwd  => $download_path
}

package { ['unzip', 'openjdk-7-jre']:
  ensure => present
}

exec { 'download sencha cmd':
  command => "wget ${sencha_cmd_link}",
  creates => "${download_path}/${$sencha_cmd_zip_file}"
}
->
exec { 'unzip sencha cmd':
  command => "unzip ${sencha_cmd_file}",
  creates => "${download_path}/${sencha_cmd_file}",
  require => Package['unzip'],
}
->
exec { 'make sencha cmd executable':
  command => "chmod +x ${sencha_cmd_file}",
  unless  => "test -x ${sencha_cmd_file}"
}
->
exec { 'install sencha cmd':
  command => "/tmp/${sencha_cmd_file} --mode unattended --prefix /home/vagrant/bin && echo 'export SENCHA_CMD_3_0_0=${install_path}\\nexport PATH=${install_path}:\$PATH' >> /home/vagrant/.bashrc",
  user    => 'vagrant',
  unless  => "test -d ${install_path}",
  require => Package['openjdk-7-jre'],
}

class { 'apache': }

apache::vhost { 'tasma.dev':
  port    => '80',
  docroot => '/vagrant/www'
}

package { 'compass':
  ensure   => present,
  provider => gem
}