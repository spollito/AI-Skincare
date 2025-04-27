package com.example.skinanalysis.Controller;

import com.example.skinanalysis.service.OpenAIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
public class SkinController {

    @Autowired
    private OpenAIService openAIService;

    @PostMapping("/analyze")
    @ResponseBody
    public ResponseEntity<String> analyzeSkin(@RequestParam("image") MultipartFile image) {
        try {
            System.out.println("Received image for analysis: " + image.getOriginalFilename() +
                    " (Size: " + image.getSize() + " bytes)");

            if (image.isEmpty()) {
                return ResponseEntity.badRequest().body("Please upload a valid image file");
            }

            // Convert the image to bytes
            byte[] imageBytes = image.getBytes();

            // Call the OpenAI service to analyze the image
            String analysisResult = openAIService.analyzeSkin(imageBytes);

            // Return the result
            return ResponseEntity.ok(analysisResult);
        } catch (IOException e) {
            // Handle file reading error
            System.err.println("Error reading uploaded image: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error reading the uploaded image: " + e.getMessage());
        } catch (Exception e) {
            // Handle other errors
            System.err.println("Error during analysis: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error during analysis: " + e.getMessage());
        }
    }
}