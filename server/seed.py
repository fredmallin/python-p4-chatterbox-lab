from app import app, db
from models import Message

with app.app_context():
    print(" Seeding database...")

    Message.query.delete()

    messages = [
        Message(body="Hello, World!", username="Ian"),
        Message(body="Hi everyone!", username="Fredrick"),
        Message(body="How are you?", username="Alice"),
    ]

    db.session.add_all(messages)
    db.session.commit()

    print(" Database seeded!")
