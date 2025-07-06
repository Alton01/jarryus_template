import { z } from "zod";

export const projectSchema = z.object({
  projectName: z
    .string()
    .min(2, {
      message: "Project Name must be at least 2 characters.",
    })
    .max(30, { message: "Project Name must be less than 30 characters." }),
  projectDescription: z.string().min(10, {
    message: "Project Description must be at least 10 characters.",
  }),
  projectShortDescription: z
    .string()
    .min(10, {
      message: "Project Description must be at least 10 characters.",
    })
    .max(40, {
      message: "Project Short Description must be less than 40 characters.",
    }),
  projectDate: z.string(),
  projectImage1: z.string().min(1, {
    message: "Project Image is required.",
  }),
  projectImage2: z.string().min(1, {
    message: "Project Image is required.",
  }),
  projectImage3: z.string().min(1, {
    message: "Project Image is required.",
  }),
  projectImage4: z.string().min(1, {
    message: "Project Image is required.",
  }),
  projectImage5: z.string().min(1, {
    message: "Project Image is required.",
  }),
});

export const propertyPostSchema = z.object({
  propertyLocation: z
    .string()
    .min(2, {
      message: "Property Location must be at least 2 characters.",
    })
    .max(50, { message: "Project Location must be less than 50 characters." }),
  propertyDescription: z.string().min(10, {
    message: "Property Description must be at least 10 characters.",
  }),
  propertyDocAvailable: z.string().min(2, {
    message: "Property Document must be at least 2 characters.",
  }),
  propertyType: z
    .string()
    .min(10, {
      message: "Property Type must be at least 10 characters.",
    })
    .max(50, { message: "Property Type must be less than 50 characters." }),
  propertyLandSize: z
    .string()
    .min(2, {
      message: "Property Land Size must be at least 2 characters.",
    })
    .max(40, { message: "Property Name must be less than 40 characters." }),
  estateProperty: z.boolean(),
  fullyFurnished: z.boolean(),
  swimmingPool: z.boolean(),
  electricity24hour: z.boolean(),
  servicedProperty: z.boolean(),
  securityPersonnel: z.boolean(),
  wiFi: z.boolean(),
  forSale: z.boolean(),
  isAvailable: z.boolean(),
  parkingForCars: z.coerce
    .number()
    .min(1, { message: "How many cars can compound accomodate?" }),
  propertyPrice: z.coerce
    .number()
    .min(1, { message: "Property price is required" }),
  propertyImage1: z.string().min(1, {
    message: "Property Image1 is required.",
  }),
  propertyImage2: z.string().min(1, {
    message: "Property Image2 is required.",
  }),
  propertyImage3: z.string().min(1, {
    message: "Property Image3 is required.",
  }),
  propertyImage4: z.string().min(1, {
    message: "Property Image4 is required.",
  }),
  propertyImage5: z.string().min(1, {
    message: "Property Image5 is required.",
  }),
  propertyImage6: z.string().min(1, {
    message: "Property Image6 is required.",
  }),
  propertyImage7: z.string().min(1, {
    message: "Property Image7 is required.",
  }),
});

export const landPostSchema = z.object({
  landLocation: z
    .string()
    .min(2, {
      message: "Land Location must be at least 2 characters.",
    })
    .max(50, { message: "Land Location must be less than 50 characters." }),
  landDocAvailable: z.string().min(2, {
    message: "Land Document must be at least 2 characters.",
  }),
  landDescription: z.string().min(10, {
    message: "Land Description must be at least 10 characters.",
  }),
  landAreaSize: z
    .string()
    .min(2, {
      message: "Land Area Size must be at least 2 characters.",
    })
    .max(50, { message: "Land Area Size must be less than 50 characters." }),
  estateProperty: z.boolean(),
  isAvailable: z.boolean(),
  landSalePrice: z.coerce
    .number()
    .min(1, { message: "Land sale price is required?" }),
  landImage1: z.string().min(1, {
    message: "Land Image1 is required.",
  }),
  landImage2: z.string().min(1, {
    message: "Land Image2 is required.",
  }),
  landImage3: z.string().min(1, {
    message: "Land Image3 is required.",
  }),
  landImage4: z.string().min(1, {
    message: "Land Image4 is required.",
  }),
});

export const airbnbPostSchema = z.object({
  airBnBLocation: z
    .string()
    .min(2, {
      message: "AirBnB Location must be at least 2 characters.",
    })
    .max(50, { message: "AirBnB Location must be less than 50 characters." }),
  airBnBDescription: z.string().min(2, {
    message: "AirBnB Description must be at least 2 characters.",
  }),
  airBnBType: z
    .string()
    .min(2, {
      message: "AirBnB Type must be at least 2 characters.",
    })
    .max(50, { message: "AirBnB Location must be less than 50 characters." }),
  fullyFurnished: z.boolean(),
  swimmingPool: z.boolean(),
  electricity24hour: z.boolean(),
  servicedProperty: z.boolean(),
  securityPersonnel: z.boolean(),
  wiFi: z.boolean(),
  isAvailable: z.boolean(),
  parkingForCars: z.coerce
    .number()
    .min(1, { message: "How many cars can compound accomodate?" }),
  airBnBDailyPrice: z.coerce
    .number()
    .min(1, { message: "Daily Rent Price is required ?" }),
  airBnBWeeklyPrice: z.coerce
    .number()
    .min(1, { message: "Weekly Rent Price is required ?" }),
  airBnBMonthlyPrice: z.coerce
    .number()
    .min(1, { message: "Monthly Rent Price is required ?" }),
  airBnBImage1: z.string().min(1, {
    message: "AirBnB Image1 is required.",
  }),
  airBnBImage2: z.string().min(1, {
    message: "AirBnB Image2 is required.",
  }),
  airBnBImage3: z.string().min(1, {
    message: "AirBnB Image3 is required.",
  }),
  airBnBImage4: z.string().min(1, {
    message: "AirBnB Image4 is required.",
  }),
  airBnBImage5: z.string().min(1, {
    message: "AirBnB Image5 is required.",
  }),
  airBnBImage6: z.string().min(1, {
    message: "AirBnB Image6 is required.",
  }),
  airBnBImage7: z.string().min(1, {
    message: "AirBnB Image7 is required.",
  }),
});

export const bookingSchema = z.object({
  bookerName: z
    .string()
    .trim()
    .min(3, { message: "Your Name must have a minimum of 3 characters" }),
  bookerPhoneNumber: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  bookerEmail: z.string().email().optional(),
  propertyViewingDate: z.string(),
  propertyType: z.string(),
  propertyId: z.string(),
  propertyName: z.string(),
});

export const blogPostSchema = z.object({
  blogTitle: z.string().min(2, {
    message: "Blog Title must be at least 2 characters.",
  }),
  blogImageBanner: z.string().min(1, {
    message: "Blog Post Banner Image is required.",
  }),
  blogContent: z.string().min(1, {
    message: "Your Blog Post cannot be empty. Please add content",
  }),
  blogSlug: z.string().min(1, {
    message: "Blog Slug Required.",
  }),
});
