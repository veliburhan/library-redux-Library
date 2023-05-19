export const upperFirstLetters=(sample)=>{
   
    var words=sample.split(" ")
   
    // Kelimeleri tek tek dönüyorum.
    var tempWords=[]
        for (let i=0;i < words.length;i++)
        { 
        // Her kelimenin harflerini tek tek dönüyourm
            var tempWord=""
            for(let j=0;j < words[i].length;j++)
            {
                if(j===0){
                    tempWord += words[i][j].toLocaleUpperCase("tr-TR")
                }
                else
                {
                    tempWord += words[i][j].toLocaleLowerCase("tr-TR")
                }
            }
            tempWords.push(tempWord)
        
        }
    const result = tempWords.join(" ")
    
    return result
}