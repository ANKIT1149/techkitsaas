"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import CompanionFormSchema from "@/Schema/CompanionFormSchema";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {redirect} from "next/navigation";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {subjects} from "@/constants";
import {CreateLearningCompanion} from "@/lib/actions/Companions.ation";

const CompanionForm = () => {

    const form = useForm<z.infer<typeof CompanionFormSchema>>({
        resolver: zodResolver(CompanionFormSchema),
        defaultValues: {
            name: "",
            topic: "",
            voice: "",
            subject: "",
            style: "",
            duration: 15
        },
    })

    const onSubmit = async(values: z.infer<typeof CompanionFormSchema>) => {
        const companion = await CreateLearningCompanion(values)

        if(companion){
            return redirect(`/companions/${companion.id}`)
        }else{
            return redirect("/")
        }
    }

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Companion Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Your Companion Name" {...field} className="input"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <SelectTrigger className="input capitalize">
                                        <SelectValue placeholder="Enter the Subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjects.map((subject) => (
                                            <SelectItem key={subject} value={subject} className="capitalize">{subject}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What should the companion help with?</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex. derivatives & integral" {...field} className="input"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="voice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Voice</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <SelectTrigger className="input">
                                        <SelectValue placeholder="Select the Voice" />
                                    </SelectTrigger>
                                    <SelectContent>
                                            <SelectItem value='male' className="capitalize">Male</SelectItem>
                                            <SelectItem value='female' className="capitalize">Female</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Style</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <SelectTrigger className="input">
                                        <SelectValue placeholder="Select the Style" />
                                    </SelectTrigger>
                                    <SelectContent>
                                            <SelectItem value='formal' className="capitalize">Formal</SelectItem>
                                            <SelectItem value='casual' className="capitalize">Casual</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estimated Duration in Mins</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder='15'
                                    {...field}
                                    className="input"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full cursor-pointer" variant="destructive">Build Your Companion</Button>
            </form>
        </Form>
    )
}

export default CompanionForm