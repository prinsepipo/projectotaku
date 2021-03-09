from django.contrib.auth.models import User

from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username']


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate_username(self, username):
        user = User.objects.filter(username=username)

        if user.exists():
            raise serializers.ValidationError('Username already used.', code='unique')

        return username

    def create(self, validated_data):
        return User.objects.create_user(username=validated_data['username'],
            password=validated_data['password'])
