# !/bin/bash

if [ $UID !== 0 ]
 then
  printf "Please run the SMC install tool as root! \n"
  exit
fi
apt install sudo curl
curl -sL https://deb.nodesource.com/setup_18.x | sudo bash -
apt install -y nodejs git

content=`wget https://raw.githubusercontent.com/DottoXD/StatusMonitor-Client/main/StatusMonitor.service`

mv ./StatusMonitor.service /lib/systemd/system/StatusMonitor.service

mkdir /etc/StatusMonitor && cd /etc/StatusMonitor
git clone https://github.com/DottoXD/StatusMonitor-Client .

npm install
npm run build

systemctl enable --now StatusMonitor
printf "@ SMClient has been installed! Make sure to configure /etc/StatusMonitor/config.json and then run systemctl restart StatusMonitor! \n"
