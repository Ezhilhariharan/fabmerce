import React from "react";
import AddIcon from "@mui/icons-material/Add";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export const QuestionsAnswers = [
  {
    question: "What is Fabmerce?",
    answer: [
      "At Fabmerce, we believe that shopping should be enjoyable for everyone. That's why we created a social commerce marketplace where you can find all kinds of physical products at very affordable prices. We're a startup that's growing every day, and we're partnering with some of the finest brands across the globe. With Fabmerce, you can enjoy social shopping from one convenient place.",
    ],
    addIcon: <AddIcon />,
    expandLess: <ExpandLess />,
    expandMore: <ExpandMore />,
  },
  {
    question: "What types of payments are supported?",
    answer: [
      " Fabmerce supports Credit card and Debit card payments as per the guidelines of the Reserve bank of India. You can add your details for faster and secure payments. You will have the option to remove your credit card details. All your payment details are secured in Fabmerce. You can also choose Cash on Delivery (COD) for your purchase if it is available for a particular product.",
    ],
    addIcon: <AddIcon />,
    expandLess: <ExpandLess />,
    expandMore: <ExpandMore />,
  },
  {
    question: "When will I get my payments after my return?",
    answer: [
      "After successful pickup of your returned products, the payment will be transferred to your given bank account within the next 3-5 business days. If there is anything you can send us email to help@fabmerce.com",
    ],
    addIcon: <AddIcon />,
    expandLess: <ExpandLess />,
    expandMore: <ExpandMore />,
  },
  {
    question: "How do I reset my Password?",
    answer: [
      "Navigate to the profile section on the top right corner",
      "Click on forgot password option",
      "Enter the email id you used to sign in",
      "Change the password",
      "Revist the login screen and enter the credentials to login",
    ],
    addIcon: <AddIcon />,
    expandLess: <ExpandLess />,
    expandMore: <ExpandMore />,
  },
  {
    question: "How do I return My order?",
    Another_answer: [
        {
            content1:[
                "Please note that orders need to be returned or replaced within 7 days from the date of delivery. To return your orders.",
            ],
            middlecontent:[
                "Login to the account",
                "Navigate to My orders section",
                "Select the product you want to return.",
                "Enter the reason for cancellation",
                "Click on request for cancellation.",
            ],
            content2:[
                "Once your details are verified your order will be picked by in the sooner time.",
            ]
        }
    ],
    addIcon: <AddIcon />,
    expandLess: <ExpandLess />,
    expandMore: <ExpandMore />,
  },
  {
    question: "Can I change the shipping address for my order once it’s placed?",
    answer: [
      " It’s not possible to change the shipping address once it is placed. You should cancel the order and place it again at the new address.",
    ],
    addIcon: <AddIcon />,
    expandLess: <ExpandLess />,
    expandMore: <ExpandMore />,
  },
  {
    question: "How do I track my order?",
    answer: [
      "Navigate to the my orders section.",
      "Select the product you want to track",
      "You will be shown with the order tracking details",
    ],
    addIcon: <AddIcon />,
    expandLess: <ExpandLess />,
    expandMore: <ExpandMore />,
  },
  {
    question: " My order tracking status shows “delivered” but I did not receive my package.",
    answer: [
      "Your package will most likely be delivered within a few days. If you do not receive your order in a couple of days, please send an email to help@fabmerce.in. with your order number and tracking information so that we may assist you further!",
    ],
    addIcon: <AddIcon />,
    expandLess: <ExpandLess />,
    expandMore: <ExpandMore />,
  },
  
];
