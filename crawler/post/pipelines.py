# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

import pymongo
import scrapy
from scrapy.utils.project import get_project_settings
settings = get_project_settings()
from scrapy.pipelines.images import ImagesPipeline
from scrapy.exceptions import DropItem


class PostPipeline(object):
    def __init__(self):
        url = settings['MONGO_URL']
        dbname = settings['MONGO_DB']
        collname = settings['MONGO_COLL']
        client = pymongo.MongoClient(url)
        self.db = client.get_database(dbname)
        self.coll = self.db[collname]
 
    def process_item(self, item, spider):
        postItem = dict(item)
        self.coll.insert(postItem)
        return item


class MyImagesPipeline(ImagesPipeline):
    def get_media_requests(self, item, info):
        for image_url in item['image']:
            yield scrapy.Request(image_url)

    def item_completed(self, results, item, info):              
        image_paths = [x['path'] for ok, x in results if ok]
        if not image_paths:
            raise DropItem("Item contains no images")        
        return item

    """
    def file_path(self, request, response=None, info=None):
        media_guid = hashlib.sha1(to_bytes(request.url)).hexdigest()
        media_ext = os.path.splitext(request.url)[1]
        return '%s%s' % (media_guid, media_ext)
    """
    
    
    
