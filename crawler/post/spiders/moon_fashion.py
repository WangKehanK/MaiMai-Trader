import scrapy
import bson
import re
from post.items import PostItem

class MoonFashionSpider(scrapy.Spider):
    name = "moon_fashion"
    start_urls = ['https://www.moonbbs.com/forum.php?mod=forumdisplay&fid=46&page=1&filter=sortid&sortid=12']
    page_link = set()

    def parse(self, response):
        links = response.xpath("//th/a[1]/@href").extract()

        # 解析每一个连接的帖子内容
        for each in links:
            yield scrapy.Request(each, callback=self.parse_content)

        next_page = response.xpath('//a[@class="nxt"]/@href').get()
        if next_page:
            yield scrapy.Request(next_page, callback=self.parse)


    def parse_content(self, response):
        postitem = PostItem()
        postitem['postId'] = str(bson.ObjectId())
        postitem['title'] = response.xpath('//*[@id="thread_subject"]/text()').get()
        postitem['description'] = self.get_description(response)
        postitem['category'] = "Fashion"
        postitem['condition'] = self.get_condition(response)
        postitem['image'] = response.xpath('//*[@class="mbn"]/a/img//@file').extract()
        postitem['deliveryMethod'] = {}
        postitem['deliveryMethod']['deliveryType'] = None
        postitem['deliveryMethod']['address'] = None
        postitem['deliveryMethod']['carrier'] = None
        postitem['price'] = {}
        postitem['price']['offerPrice'] = self.get_offerPrice(response)
        postitem['price']['originalPrice'] = None
        postitem['user'] = {}
        postitem['user']['userId'] = self.get_userId(response)
        postitem['user']['userName'] = response.xpath('//*[@class="authi"]/a//text()').get()
        postitem['user']['school'] = None
        postitem['contact'] = {}
        postitem['contact']['wechat'] = self.get_wechat(response)
        postitem['contact']['email'] = self.get_email(response)
        postitem['contact']['phone'] = self.get_phone(response)
        yield postitem


    def get_description(self, response):        
        description = response.xpath('//td[@class="t_f"]/text()').extract()
    
        content = ''
        if len(description) > 1:
            for i in range(1, len(description)):
                if description[i] == '\n':
                    continue
                else:
                    norm = description[i].replace('\r','').replace('\n','')
                    if len(content) == 0:
                        content += norm
                    else:
                        content = content + '。' + norm
        else:
            content = description[0].replace('\r','').replace('\n','')
        return content
                

    def get_condition(self, response):
        info = response.xpath('//*[@class="pcb"]/table//text()').extract()
    
        if len(info) > 0:
            for i in range(len(info)):
                if info[i] == '新旧程度:':
                    condition = info[i+1]
                    return condition
        return None


    def get_offerPrice(self, response):
        info = response.xpath('//*[@class="pcb"]/table//text()').extract()

        if len(info) > 0:
            for i in range(len(info)):
                if info[i] == '价格:':
                    offerPrice = info[i+1].replace('$', '')
                    return int(offerPrice)
        return None
    

    def get_userId(self, response):
        user = response.xpath('//*[@class="authi"]/a/@href').get()

        return "moonbbs" + user.replace("https://www.moonbbs.com/space-uid-", "").replace(".html", "")


    def get_wechat(self, response):
        contact = response.xpath('//*[@class="contact"]/div/table/tr/td/text()').extract()

        if len(contact) > 0:
            for i in range(len(contact)):
                if contact[i] == '微信号':
                    return contact[i+1]
        return None


    def get_email(self, response):
        contact = response.xpath('//*[@class="contact"]/div/table/tr/td/text()').extract()

        if len(contact) > 0:
            for i in range(len(contact)):
                if contact[i] == '邮箱':
                    return contact[i+1]
        return None


    def get_phone(self, response):
        contact = response.xpath('//*[@class="contact"]/div/table/tr/td/text()').extract()

        if len(contact) > 0:
            for i in range(len(contact)):
                if contact[i] == '电话':
                    return contact[i+1]
        return None


        
            
            
    
