# limstagram

Clonning instagram with python django and react and react native
인스타그램 클론하기 ( 파이선 장고, 리액트 )

## 사용 환경
    Visual Studio Code
    XCode
    Android Studio
    Genymotion
    Expo (XDE)
    Nodejs
    NPM
    Yarn
    Python 3.6
    pip
    pipenv or anaconda
    Postgres
    Explo Client

## 장고 프로젝트 생성
     cookiecutter https://github.com/pydanny/cookiecutter-django
     pip install -r requirements/local.txt
     - 로컬 파일들을 인스톨함
     cd limstagram
     django-admin startapp images
    - 이미지를 업로드 , 사용 할수 있도록 앱을 만들어줌
    ```python
    class ImagesConfig(AppConfig):
    name = 'limstagram.images'
    ```
    - 이후 base.py 에서 LOCAL_APPS 에 images 추가하기

