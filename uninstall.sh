# !/bin/bash

if [ $USER != root ]
 then
  printf "Please run this as root! \n"
  exit
fi

systemctl disable --now statusmonitor
apt remove -y nodejs git
rm -r /etc/statusmonitor

printf "StatusMonitor - Client by Dotto has been uninstalled!"
