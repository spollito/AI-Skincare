package com.example.skinanalysis.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping("/dashboard")
    public String dashboard() {
        return "dashboard";
    }

    @GetMapping("/analysis")
    public String analysis() {return "analysis";}

    @GetMapping("/products")
    public String products() {return "products";}

    @GetMapping("/routine")
    public String routine() {return "routine";}
}



