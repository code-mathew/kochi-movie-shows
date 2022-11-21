const fs = require('fs');
const puppeteer = require('puppeteer');

 async function run(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://in.bookmyshow.com/explore/movies-kochi');

     await page.keyboard.down("PageDown");
     await page.keyboard.press("PageDown");
     await page.screenshot({path:'example.png', fullPage:true });
    //Running Movies section
     const runningMovies = await page.evaluate(()=> 
     Array.from(document.querySelectorAll('.jBFgAs .gteFjS .cVsUJT .gDSiod a'), (e)=> ({
         title: e.querySelector('.Xdzak .kKvMMQ .dmACKf .gyGThn .cFdPHn').innerText,
         cert: e.querySelector('.Xdzak .kKvMMQ .dmACKf .gyGThn .fbwUfl').innerText,
         lang: e.querySelector('.Xdzak .kKvMMQ .dmACKf .gyGThn:nth-child(3) .fbwUfl').innerText,
         image: e.querySelector('.Xdzak .kKvMMQ img').src,
         url: e.href,
         
        
 
     }))
     );

     console.log(runningMovies);

    //Save data to JSON file

    fs.writeFile('runningMovies.json', JSON.stringify(runningMovies), (err) => {
        if(err) throw err;
        console.log("File Saved");
    });

    await browser.close();

}

run();