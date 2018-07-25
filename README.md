# limstagram

Clonning instagram with python django and react and react native

인스타그램 클론하기 ( 파이선 장고, 리액트, 리엑트 네이티브 )

-----------------------------------------------------
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
        limstagram 폴더 및에 이미지폴더 생성됨
     - 이후 base.py 에서 LOCAL_APPS 에 images 추가하기
    
     python manage.py migrate
     python manage.py makemigrations (생성한 모델, 어플레키에션 필드들을 변경시)
     python manage.py createsuperuser (장고 슈퍼유저 생성)


## 알아야 할것들
> Django ORM
>> create() , get(), filter(), delete()
```python
from django.db import models
# 모델 생성
class Cat(models.Model):
    name = models.CharField(max_length=30)
    brees = models.CharField(max_length=30)

# 오브젝트 생성
Cat.object.create(
    name="Fluffy",
    breed="Perian"
)

# 검색
## 아이디를 이용한 검색 및 수정
cat = Cat.objects.get(id=1)
fluffy.name = "Mr. Fluffy"
fluffy.save()

## 필터를 이용한 검색
british_cats = Cat.objects.filter(breed="British")

## 필터 Lookups options = startwith, contains, istartswith, icontainsm, lt , gt, ...
cats = Cat.objects.filter(name__startswith="Mr")
cats = Cat.objects.all()

# delete()
fluffy = Cat.objects.get(id=1)
fluffy.delete()

# foreignKey 모델에 생성
class Owner(models.Model):
    name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    age = models.IntegerField()
    following = models.ManyToManyField('self')
    followers = models.ManyToManyField('self')

# 외래키 설정하기
from . import Owner
owner = models.ForeignKey(Owner, null=True)

# 저장방법
king = Owner.objects.create(name="king", last_name="lim", age=45)
bunns = Cat.objects.get(id=2)
bunns.owner = king
bunns.save()

# 데이터 접근방법
bunns = Cat.objects.get(id=2)
print(bunns.owner.age)

king = Owner.objects.get(pk=1)
king_cats = king.cat_set.all()
```

## 참고자료
--------------------

> Class Ingeritance and Models and Fields

- https://docs.djangoproject.com/en/1.11/topics/db/models/
- https://docs.djangoproject.com/en/1.11/ref/models/fields/

> Abstract base classes

- https://docs.djangoproject.com/en/1.11/topics/db/models/#abstract-base-classes
- https://docs.djangoproject.com/en/1.11/ref/models/fields/

> Django Models

- https://docs.djangoproject.com/en/1.11/topics/db/models/

> Django Admin

- https://docs.djangoproject.com/en/1.11/ref/contrib/admin/