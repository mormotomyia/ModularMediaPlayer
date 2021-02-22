from pyvirtualdisplay import Display
from selenium import webdriver
import time
display = Display(visible=0, size=(1366, 768))
display.start()

from selenium import webdriver
from selenium.webdriver.chrome.service import Service

service = Service('/usr/bin/chromium-browser')
service.start()
driver = webdriver.Remote(service.service_url)
driver.get('http://www.google.com/')
time.sleep(5) # Let the user actually see something!
driver.quit()

# options = webdriver.ChromeOptions()
# options.binary_location = '/usr/bin/chromium-browser'
# options.add_argument("window-size=2160,2440")
# browser = webdriver.Chrome(options.binary_location,options=options)

# browser.get('http://localhost:1234')
# print(browser.title)
# browser.quit()

display.stop()