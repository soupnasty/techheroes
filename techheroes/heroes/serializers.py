from rest_framework import serializers

from accounts.serializers import UserWithTokenSerializer

from .models import Hero


class HeroSkillSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=25)
    years = serializers.IntegerField(min_value=1)


class CreateUpdateHeroSerializer(serializers.Serializer):
    discipline = serializers.CharField(max_length=2)
    short_bio = serializers.CharField(max_length=200)
    resume = serializers.CharField()
    years_of_exp = serializers.IntegerField(min_value=1)
    rate_in_cents = serializers.IntegerField(min_value=0)
    linkedin_url = serializers.URLField()
    skills = HeroSkillSerializer(many=True)

    def validate_discipline(self, value):
        """Validate if discipline is one of the choices"""
        disciplines = [x[0] for x in Hero.DISCIPLINES]
        if value not in disciplines:
            raise serializers.ValidationError('Discipline must be in {}'.format(disciplines))
        return value


class HeroWithTokenSerializer(serializers.ModelSerializer):
    user = UserWithTokenSerializer(many=False)

    class Meta:
        model = Hero
        fields = ('user', 'discipline', 'short_bio', 'resume', 'years_of_exp',
                    'rate_in_cents', 'skills', 'accepted', 'linkedin_url', 'created', 'updated')
        read_only_fields = ('accepted', 'created', 'updated')

