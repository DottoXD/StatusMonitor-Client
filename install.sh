# !/bin/bash

if [ $UID !== 0 ]
 then
  printf "Please run this as root! \n"
  exit
fi
apt install sudo curl
curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
apt install -y nodejs git

content=`wget https://raw.githubusercontent.com/DottoXD/statusmonitor-client/main/statusmonitor.service`


mv ./statusmonitor.service /lib/systemd/system/statusmonitor.service

mkdir /etc/statusmonitor && cd /etc/statusmonitor
git clone https://github.com/DottoXD/statusmonitor-client .

npm install

systemctl enable --now statusmonitor
printf "StatusMonitor - Client by Dotto has been installed! Make sure to configure /etc/statusmonitor/config.json and then systemctl restart statusmonitor! \n"
