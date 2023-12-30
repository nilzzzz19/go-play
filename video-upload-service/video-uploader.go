package main

import (
	"context"
	"io"

	"cloud.google.com/go/storage"
	"github.com/gin-gonic/gin"
)

func handleVideoUpload(c *gin.Context) {
	//retrieve the file from form-data
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	//save the file to this bucket
	bucket := "go-movies"

	//init a gcp client
	ctx := context.Background()
	client, err := storage.NewClient(ctx)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	defer client.Close()

	//open file
	f, err := file.Open()
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	defer f.Close()

	//create an obj in bucket
	wc := client.Bucket(bucket).Object(file.Filename).NewWriter(ctx)

	//write the file to the obj
	if _, err = io.Copy(wc, f); err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	if err := wc.Close(); err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "Upload successful!", "filename": file.Filename})
}

func main() {
	r := gin.Default()
	r.POST("/upload", handleVideoUpload)
	r.Run(":8082")
}
