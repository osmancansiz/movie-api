const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../../app");

chai.use(chaiHttp);

let token, movieId;

describe("/api/movies tests", () => {
  before(done => {
    chai
      .request(server)
      .post("/authenticate")
      .send({ username: "ocansiz", password: "need1207" })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  describe("/GET Movies", () => {
    it("it should GET All the movies ", done => {
      chai
        .request(server)
        .get("/api/movies")
        .set("x-access-token", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  describe("/POST Movies", () => {
    it("it should POST a movie", done => {
      const movie = {
        title: "Udemy",
        director_id: "5dc83dc365862e3300e92d26",
        category: "Komedi",
        country: "Türkiye",
        year: 1950,
        imdb_score: 8
      };
      chai
        .request(server)
        .post("/api/movies")
        .send(movie)
        .set("x-access-token", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("title");
          res.body.should.have.property("director_id");
          res.body.should.have.property("category");
          res.body.should.have.property("country");
          res.body.should.have.property("year");
          res.body.should.have.property("imdb_score");
          movieId = res.body._id;
          done();
        });
    });
  });

  describe("/GET/:director_id Movies", () => {
    it("it should GET a movie by the given id ", done => {
      chai.request(server)
        .get("/api/movies/"+movieId)
        .set("x-access-token", token)
        .end((err,res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property("title");
          res.body.should.have.property("director_id");
          res.body.should.have.property("category");
          res.body.should.have.property("country");
          res.body.should.have.property("year");
          res.body.should.have.property("imdb_score");
          res.body.should.have.property("_id").eql(movieId);
          done();
        })
    });
  });
});

//Maçın son kornerinde karşı kaleye koşan kaleci çaresizliğiyle geliyorum sana,
// o kadar seçeneksizim o kadar kaybedecek bir şeyim yok.
