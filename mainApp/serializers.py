from rest_framework import serializers
from .models import Game

class GameSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    class Meta:
        model = Game
        fields = ['id', 'title', 'description', 'image', 'link', 'created_at', 'updated_at', 'author']
    def get_author(self, obj):
        return obj.author.username