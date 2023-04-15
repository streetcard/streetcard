# __Set Up Dev Environment__
## Prerequisites
- [Python 3.10](https://www.python.org/downloads/) or better installed
- [Git](https://git-scm.com/downloads)  installed
## Set Up 
Clone Repo
```sh
git clone https://github.com/streetcard/streetcard.git
```
Navigate To Root Folder
```sh
cd streetcard
```
Create Virtual Environment
```sh
py -m venv streetcard\env
```
Activate Virual Environment
```sh
.\streetcard\env\Scripts\activate
```
Install/Upgrade PIP
```sh
python.exe -m pip install --upgrade pip
```
Install Wagtail
```sh
pip install wagtail
```
Install Django
```sh
pip install django
```
Install Psycopg2
```sh
pip install psycopg2-binary 
```
Install Jsonfield
```sh
pip install jsonfield 
```
Make Migrations
```sh
python manage.py migrate
```
Run Server
```sh
python manage.py runserver
```

Your development environment should be working. 
