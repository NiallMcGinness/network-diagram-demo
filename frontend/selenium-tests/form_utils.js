var webdriver = require('selenium-webdriver');
var By = require('selenium-webdriver').By;
var driver = new webdriver.Builder().forBrowser('chrome').build();

async function fill_form(form_entries) {

    const { description, version, tags, click_diagram, click_submit } = form_entries;

    try {
        await driver.get("http://localhost:3000/uploadform")
        if (description) await driver.findElement(By.css("input[name='description']")).sendKeys(description)
        if (tags) await driver.findElement(By.css("input[name='tags']")).sendKeys(tags)
        if (click_diagram) await driver.findElement(By.css("div.w-full")).click()
        if (click_submit) await driver.findElement(By.css(".px-4")).click()
        await driver.sleep(100000)
    } catch (error) {


        console.log(` form test error :  ${error}  `);

    }
    finally {

        await driver.close()
    }




}


export { fill_form };