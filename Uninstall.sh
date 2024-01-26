# !/bin/bash

if [ $UID !== 0 ]
 then
  printf "Please run the SMC uninstall tool as root! \n"
  exit
fi

systemctl disable --now StatusMonitor
apt remove -y nodejs git
rm -r /etc/StatusMonitor
rm /lib/systemd/system/StatusMonitor.service

printf "@ SMClient has been uninstalled! \n"
