import { Locator, Page } from "@playwright/test";

export class JobMenu{

    readonly page:Page
    readonly job: Locator
    readonly jobTitlesOption
    readonly payGradesOption


    constructor(page: Page){
    this.page = page
    this.job = page.getByRole('navigation', {name: 'Topbar Menu'}). getByText('Job')
    this.jobTitlesOption = page.getByRole('menuitem', {name: 'Job Titles'})
    this.payGradesOption= page.getByRole('menuitem', {name: 'Pay Grades'})
        
    }
     async clicKOnJob(){
        await this.job.click()
       
    }

    async clicKOnJobTitles(){ 
        await this.clicKOnJob()   
        await this.jobTitlesOption.click()

    }
    async clicKOnPayGrades(){
     await this.clicKOnJob()  
        await this.payGradesOption.click()

   
    }
    


}