import { Check, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";

const faqData = [
    {
        question: "What is the goal of this website?",
        answer:
            "Our goal is to provide transparency and fairness in compensation for all groups, particularly minorities."
    },
    {
        question: "How is salary data analyzed?",
        answer:
            "We use statistical methods to compare salaries while controlling for factors like experience and education."
    },
    {
        question: "What is the difference between median and mean salary data?",
        answer:
            "The median salary represents the midpoint of all salaries, giving a more accurate picture of typical pay."
    },
    {
        question: "What data do you collect from users?",
        answer:
            "We collect basic demographic and job information, including age, race, gender, salary, job title, and location."
    },
    {
        question: "Why do you focus on racial and gender equity?",
        answer:
            "We aim to shed light on salary disparities and push for more equitable practices in hiring and compensation."
    },
    {
        question: "How do you calculate the pay gap between different groups?",
        answer:
            "We use a Pay Gap Algorithm that compares the median salaries of different groups and calculates the percentage difference."
    },
    {
        question: "Can I trust the salary data on this site?",
        answer:
            "We source our salary data from a combination of user submissions and publicly available datasets, ensuring accuracy."
    },
    {
        question: "How can I contribute my salary data?",
        answer:
            "Sign up and provide details such as job title, salary, race, gender, and company. All data is kept confidential."
    }
];

const FAQ = () => (
    <Layout>
        <div className="w-full py-20 lg:py-40 px-4 lg:px-8">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-10">
                    <div className="flex gap-10 flex-col">
                        <div className="flex gap-4 flex-col">
                            <div>
                                <Badge variant="outline">FAQ</Badge>
                            </div>
                            <div className="flex gap-2 flex-col">
                                <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-regular">
                                    Frequently Asked Questions
                                </h4>
                                <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                                    
                                </p>
                            </div>
                            <div className="">
                                <Button className="gap-4" variant="outline">
                                    More questions? Reach out <PhoneCall className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                        {/* Step 2: Map over the FAQ data */}
                        {faqData.map((faq, index) => (
                            <AccordionItem key={index} value={"index-" + index}>
                                <AccordionTrigger>
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                    
                </div>
            </div>
        </div>
        
        
    </Layout>
);

export default FAQ;