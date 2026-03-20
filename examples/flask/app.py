# Flask REST API example
# run: pip install flask && python examples/flask/app.py
from flask import Flask, jsonify, request
from sahih_muslim import Muslim

app    = Flask(__name__)
muslim = Muslim()

@app.get("/api/hadith/random")
def random_hadith(): return jsonify(muslim.getRandom().to_dict())

@app.get("/api/hadith/<int:hadith_id>")
def get_hadith(hadith_id):
    h = muslim.get(hadith_id)
    return jsonify(h.to_dict()) if h else (jsonify({"error": "Not found"}), 404)

@app.get("/api/chapter/<int:chapter_id>")
def get_chapter(chapter_id):
    h = muslim.getByChapter(chapter_id)
    return jsonify({"count": len(h), "hadiths": [x.to_dict() for x in h]}) if h else (jsonify({"error": "Not found"}), 404)

@app.get("/api/search")
def search():
    r = muslim.search(request.args.get("q", ""), int(request.args.get("limit", 0)))
    return jsonify({"count": len(r), "results": [h.to_dict() for h in r]})

@app.get("/api/chapters")
def chapters(): return jsonify([c.to_dict() for c in muslim.chapters])

if __name__ == "__main__":
    print("Sahih Muslim API at http://localhost:5000")
    app.run(debug=True)
