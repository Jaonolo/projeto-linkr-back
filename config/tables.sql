CREATE TABLE "users" (
	"id" serial NOT NULL PRIMARY KEY,
	"userName" TEXT NOT NULL UNIQUE,
	"profilePicture" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"passwordHash" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "posts" (
	"id" serial NOT NULL PRIMARY KEY,
	"userId" integer NOT NULL REFERENCES users(id),
	"link" TEXT NOT NULL,
	"message" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
	"edited" BOOLEAN NOT NULL DEFAULT 'false'
);

CREATE TABLE "hashtags" (
	"id" serial NOT NULL PRIMARY KEY,
	"tag" TEXT NOT NULL UNIQUE,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "likes" (
	"id" serial NOT NULL PRIMARY KEY,
	"userId" integer NOT NULL REFERENCES users(id),
	"postId" integer NOT NULL REFERENCES posts(id),
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "postsHashtags" (
	"id" serial NOT NULL PRIMARY KEY,
	"postId" integer NOT NULL REFERENCES posts(id),
	"hashtagId" integer NOT NULL REFERENCES hashtags(id)
);

CREATE TABLE "sessions" (
	"id" serial NOT NULL PRIMARY KEY,
	"userId" integer NOT NULL REFERENCES users(id),
	"token" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);