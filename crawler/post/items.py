# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class PostItem(scrapy.Item):
    # define the fields for your item here like:
    postId = scrapy.Field()
    title = scrapy.Field()
    description = scrapy.Field()
    category = scrapy.Field()
    condition = scrapy.Field()
    image = scrapy.Field()
    deliveryMethod = scrapy.Field()
    price = scrapy.Field()
    user = scrapy.Field()
    contact = scrapy.Field()
    
    
