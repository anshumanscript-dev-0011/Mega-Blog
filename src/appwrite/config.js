import conf from "../conf/conf.js";
import { Client, ID, Storage, Databases, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setProject(conf.appWriteProjectId)
      .setEndpoint(conf.appWriteUrl);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          status,
          featuredImage,
          userId,
        },
      );
    } catch (error) {
      console.log("Appwrite service :: Database :: Error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          status,
          featuredImage,
        },
      );
    } catch (error) {
      console.log("Appwrite service :: UpdatePost :: Error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: Error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: Error", error);
    }
  }

  async listPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        queries,
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: Error", error);
      return false;
    }
  }

  //Upload Files Services

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appWriteBucketId,
        ID.unique(),
        file,
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: Error", error);
      return null;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appWriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: Error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFileView(conf.appWriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
