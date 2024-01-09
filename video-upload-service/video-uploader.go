package main

import (
	"context"
	"fmt"
	"io"
	"time"

	"cloud.google.com/go/storage"
	"github.com/gin-gonic/gin"
	"google.golang.org/api/iterator"
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

func handleVideoList(c *gin.Context) {
	//save the file to this bucket
	bucket := "go-movies"

	//init a gcp client
	ctx := context.Background()
	client, err := storage.NewClient(ctx)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	defer client.Close() //close client when done with it

	//get bucket obj
	it := client.Bucket(bucket).Objects(ctx, nil)

	var files []string

	//iterate over bucket obj and append to files slice
	for {
		attrs, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		files = append(files, attrs.Name)
	}
	c.JSON(200, gin.H{"files": files})
}

func main() {
	start_time := time.Now()
	r := gin.Default()
	r.POST("/upload", handleVideoUpload)
	r.GET("/videos", handleVideoList)
	r.Run(":8082")
	elapsed := time.Since(start_time)
	fmt.Println("Time taken to start server: ", elapsed)
}
