package com.example.skinanalysis.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.MediaType;

import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OpenAIService {
    @Value("${openai.api.key}")
    private String apiKey;

    private final WebClient webClient;

    public OpenAIService(WebClient.Builder builder) {
        // OpenAI's API base URL
        this.webClient = builder.baseUrl("https://api.openai.com").build();
    }

    public String analyzeSkin(byte[] imageBytes) {
        try {
            System.out.println("Analyzing skin image of size: " + imageBytes.length + " bytes");

            // Base64 encode the image
            String base64Image = Base64.getEncoder().encodeToString(imageBytes);

            // Create the OpenAI API request in the correct format
            Map<String, Object> requestBody = new HashMap<>();

            // Use gpt-4o instead of gpt-4-vision-preview
            requestBody.put("model", "gpt-4o");

            // Create the message with content
            Map<String, Object> message = new HashMap<>();
            message.put("role", "user");

            // Create the content list
            List<Map<String, Object>> contentList = List.of(
                    Map.of("type", "text",
                            "text", "You are a friendly skincare enthusiast who helps people understand their skin better. " +
                                    "You're not a medical professional and you don't diagnose conditions or provide treatment recommendations. " +
                                    "Instead, you describe what you observe in images using everyday language and educational information. " +
                                    "You should particularly focus on identifying different types of acne (like whiteheads, blackheads, papules, etc.), " +
                                    "signs of dryness (flakiness, tightness), and potential sun exposure effects (redness, tanning). " +
                                    "Always be conversational, positive, and avoid medical terminology. If you're uncertain, say so, but still provide observations."
                    ),
                    Map.of("type", "image_url",
                            "image_url", Map.of("url", "data:image/jpeg;base64," + base64Image))
            );

            message.put("content", contentList);
            requestBody.put("messages", List.of(message));

            // Set max tokens for response
            requestBody.put("max_tokens", 800);

            System.out.println("Sending request to OpenAI API with model: gpt-4o");

            // Make the API call
            Map<String, Object> response = webClient.post()
                    .uri("/v1/chat/completions")
                    .contentType(MediaType.APPLICATION_JSON)
                    .header("Authorization", "Bearer " + apiKey)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            System.out.println("Response received from OpenAI API");

            // Extract the analysis result from the response
            if (response != null && response.containsKey("choices")) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
                if (!choices.isEmpty()) {
                    Map<String, Object> choice = choices.get(0);
                    Map<String, Object> responseMessage = (Map<String, Object>) choice.get("message");
                    return (String) responseMessage.get("content");
                }
            }

            return "Analysis failed: No valid response from OpenAI";
        } catch (Exception e) {
            // Log the error for debugging
            System.err.println("Error during skin analysis: " + e.getMessage());
            e.printStackTrace();
            return "Error analyzing image: " + e.getMessage();
        }
    }
}