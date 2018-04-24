# Microservice_Notizblock

Start der Anwendung:
docker-compose up

Anwendung im Browser aufrufbar auf:
localhost:3000

Wahlweise auch als api:
GET localhost:3000/notes/all -> liefert alle Notizen
POST localhost:3000/notes/ -> fügt neue Notiz in die DB
PUT localhost:3000/notes/:id -> überschreibt die Notiz mit der id :id
DELETE localhost:3000/notes/:id -> löscht die Notiz mit der id :id