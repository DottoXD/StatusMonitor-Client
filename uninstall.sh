# !/bin/bash

if [ $USER != root ]
 then
  printf "Please run this as root! \n"
  exit
fi

systemctl disable --now statusmonitor
apt remove -y nodejs git
rm -r /etc/statusmonitor
rm /lib/systemd/system/statusmonitor.service

printf "StatusMonitor - Client by Dotto has been uninstalled! \n"
