const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../../app");
const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

chai.use(chaiHttp);

let token, directorId;

describe("/api/directors tests", () => {
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

  describe("/GET directors", () => {
    it("it should GET All the directors ", done => {
      chai
        .request(server)
        .get("/api/directors")
        .set("x-access-token", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  describe("/POST directors", () => {
    it("it should POST a director", done => {
      const director = {
        name: "DirectorTest Name",
        surname: "DirectorTest Surname",
        bio: "Director test mocha chai tested."
      };
      chai
        .request(server)
        .post("/api/directors")
        .send(director)
        .set("x-access-token", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("name");
          res.body.should.have.property("surname");
          res.body.should.have.property("bio");
          directorId = res.body._id;
          done();
        });
    });
  });

  describe("/GET :director_id", () => {
    it("Get Director record by ID", done => {
      chai
        .request(server)
        .get("/api/directors/" + directorId)
        .set("x-access-token", token)
        .end((err, res) => {
          if (err) throw err;

          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  describe("/PUT:director_id director", () => {
    it("it should UPDATE a director given by id", done => {
      const director = {
        name: "DirectorTest2 Name",
        surname: "DirectorTest2 Surname",
        bio: "Director2 test mocha chai tested."
      };
      chai
        .request(server)
        .put("/api/directors/" + directorId)
        .send(director)
        .set("x-access-token", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("name").eql(director.name);
          res.body.should.have.property("surname").eql(director.surname);
          res.body.should.have.property("bio").eql(director.bio);
          done();
        });
    });
  });

  describe("/DELETE:director_id Directors", () => {
    it("it should DELETE a director given by id", done => {
      chai
        .request(server)
        .delete("/api/directors/" + directorId)
        .set("x-access-token", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("status").eql(1);
          done();
        });
    });
  });
});
