const fs = require('fs');
const puppeteer = require('puppeteer');

 async function run(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://in.bookmyshow.com/explore/movies-kochi');

     //await page.keyboard.down("PageDown");
     for(let i=0;i<7;i++){  // loops the pagedown btn 
        await page.keyboard.press("PageDown");
     }
     await page.waitForSelector('.jBFgAs .jaypsW', { /// waits for the selector to become hidden
        hidden:true,
        // visible:false
      });
     for(let i=0;i<7;i++){  // loops the pagedown btn //gives some more time to fetch
        await page.keyboard.press("PageDown");
     }
     
     
     
     await page.screenshot({path:'example.png', fullPage:true });
    //Running Movies section 1
     const runningMoviesAlpha = await page.evaluate(()=> 
     Array.from(document.querySelectorAll('.jBFgAs .gteFjS .cVsUJT .gDSiod a'), (e)=> ({
         title: e.querySelector('.Xdzak .kKvMMQ .dmACKf .gyGThn .cFdPHn').innerText,
         cert: e.querySelector('.Xdzak .kKvMMQ .dmACKf .gyGThn .fbwUfl').innerText,
         lang: e.querySelector('.Xdzak .kKvMMQ .dmACKf .gyGThn:nth-child(3) .fbwUfl').innerText,
         image: e.querySelector('.Xdzak .kKvMMQ img').src,
         url: e.href,
         
        
 
     }))
     );

     //Balance movie list section 2
     const runningMoviesBeta = await page.evaluate(()=>
     Array.from(document.querySelectorAll('.jBFgAs .gqBECX .iIGMqX .iUuHNJ a'), (e)=> ({
        title: e.querySelector('.eQcIov .cWbeuJ .WfspT .cBsijw').innerText,
        cert: e.querySelector('.eQcIov .cWbeuJ .WfspT .bMPkUy').innerText,
        lang: e.querySelector('.eQcIov .cWbeuJ .WfspT:nth-child(3) .bMPkUy').innerText,
        image: e.querySelector('.eQcIov img').src,
        url:e.href
    })));

    
     console.log(runningMoviesAlpha);
     console.log("Balance");
     console.log(runningMoviesBeta);

    const runningMovies = runningMoviesAlpha.concat(runningMoviesBeta);

    //Save data to JSON file

    fs.writeFile('runningMovies.json', JSON.stringify(runningMovies), (err) => {
        if(err) throw err;
        console.log("File Saved");
    });

    await browser.close();

}

run();