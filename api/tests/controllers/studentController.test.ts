import app from "..";
import supertest from "supertest";

import { Student } from "src/types/Student";

describe("Test student requests", () => {
  it("should return all the students", async () => {
    await supertest(app)
      .get("/students")
      .expect(200)
      .then((res) =>
        expect(res.body).toMatchObject([
          {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            city: "Belo Horizonte",
            birth: new Date("11/13/1999").toISOString(),
          },
        ])
      );
  });

  it("should return a specific student", async () => {
    await supertest(app)
      .get("/students/1")
      .expect(200)
      .then((res) =>
        expect(res.body).toMatchObject({
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          city: "Belo Horizonte",
          birth: new Date("11/13/1999").toISOString(),
        })
      );
  });

  it("should create a new student", async () => {
    const newStudent = {
      name: "John Doe 2",
      email: "john.doe.2@example.com",
      city: "Belo Horizonte",
      birth: new Date("11/13/1999").toISOString(),
    };

    await supertest(app)
      .post("/students")
      .send(newStudent)
      .then((res) => expect(res.body).toMatchObject({ id: 2, ...newStudent }));
  });

  describe("When updating a student", () => {
    it("should return the updated student object", async () => {
      const updatedStudent = {
        id: 1,
        name: "John Eu",
        email: "john.eu@example.com",
        city: "Ibirit",
        birth: new Date("11/13/1999").toISOString(),
      };

      await supertest(app)
        .put("/students/1")
        .send(updatedStudent)
        .then((res) => expect(res.body).toMatchObject(updatedStudent));
    });

    it("should update the student on the database", async () => {
      const updatedStudent = {
        id: 1,
        name: "John Eu",
        email: "john.eu@example.com",
        city: "Ibirit",
        birth: new Date("11/13/1999").toISOString(),
      };

      await supertest(app)
        .get("/students/1")
        .expect(200)
        .then((res) => expect(res.body).toMatchObject(updatedStudent));
    });
  });

  describe("When deleting a student", () => {
    it("should return the deleted student object", async () => {
      const deletedStudent = {
        id: 1,
        name: "John Eu",
        email: "john.eu@example.com",
        city: "Ibirit",
        birth: new Date("11/13/1999").toISOString(),
      };

      await supertest(app)
        .delete("/students/1")
        .expect(200)
        .then((res) => expect(res.body).toMatchObject(deletedStudent));
    });

    it("should delete the student from the database", async () => {
      await supertest(app)
        .get("/students")
        .expect(200)
        .then((res) =>
          expect(res.body.find((s: Student) => s.id === 1)).toBeUndefined()
        );
    });
  });
});
