import os

apps = ['accounts', 'xray', 'cough', 'symptoms', 'medications', 'chat', 'analytics', 'telemedicine']

core_urls = """from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
"""
for app in apps:
    core_urls += f"    path('api/{app}/', include('{app}.urls')),\n"
core_urls += "]\n"

with open('lungdetect/urls.py', 'w') as f:
    f.write(core_urls)

# Generating urls.py for all apps
for app in apps:
    with open(f'{app}/urls.py', 'w') as f:
        f.write("from django.urls import path\nfrom . import views\n\nurlpatterns = [\n]\n")

print("Files successfully generated.")
