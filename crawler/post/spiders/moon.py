import scrapy
import bson
from post.items import PostItem

class MoonSpider(scrapy.Spider):
    name = "moon"
    start_urls = ['https://www.moonbbs.com/forum-46-2.html']

    def parse(self, response):
        links = response.xpath("//th/a[1]/@href").extract()

        # 解析每一个连接的帖子内容
        for each in links[:6]:
            yield scrapy.Request(each, callback=self.parse_content)


    def parse_content(self, response):
        postitem = PostItem()
        postitem['postId'] = str(bson.ObjectId())
        postitem['title'] = response.xpath('//*[@id="thread_subject"]/text()').get()
        postitem['description'] = self.get_description(response)
        postitem['category'] = None
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
        postitem['user']['userId'] = None
        postitem['user']['userName'] = response.xpath('//*[@class="authi"]/a//text()').get()
        postitem['user']['school'] = None
        postitem['contact'] = {}
        postitem['contact']['wechat'] = self.get_wechat(response)
        postitem['contact']['email'] = None
        postitem['contact']['phone'] = None
        postitem['contact']['qq'] = None
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

        for i in range(0, len(info)):
            if info[i] == '新旧程度:':
                condition = info[i+1]
                return condition

        return None


    def get_offerPrice(self, response):
        info = response.xpath('//*[@class="pcb"]/table//text()').extract()

        for i in range(0, len(info)):
            if info[i] == '价格:':
                offerPrice = info[i+1].replace('$', '')
                return int(offerPrice)

        return None


    def get_wechat(self, response):
        contact = response.xpath('//*[@class="contact"]/div/table/tr/td/text()').extract()

        if len(contact) > 1:
            if contact[0] == '微信号':
                return contact[1]

        return None

            
            
    
