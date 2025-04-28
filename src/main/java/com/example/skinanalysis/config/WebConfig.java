package com.example.skinanalysis.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

@Configuration
@ControllerAdvice
public class WebConfig implements WebMvcConfigurer {

    @Value("${FIREBASE_API_KEY}")
    private String firebaseApiKey;

    @Value("${FIREBASE_AUTH_DOMAIN}")
    private String firebaseAuthDomain;

    @Value("${FIREBASE_PROJECT_ID}")
    private String firebaseProjectId;

    @Value("${FIREBASE_STORAGE_BUCKET}")
    private String firebaseStorageBucket;

    @Value("${FIREBASE_SENDER_ID}")
    private String firebaseSenderId;

    @Value("${FIREBASE_APP_ID}")
    private String firebaseAppId;

    @Value("${FIREBASE_MEASUREMENT_ID}")
    private String firebaseMeasurementId;

    @ModelAttribute
    public void addAttributes(Model model) {
        model.addAttribute("FIREBASE_API_KEY", firebaseApiKey);
        model.addAttribute("FIREBASE_AUTH_DOMAIN", firebaseAuthDomain);
        model.addAttribute("FIREBASE_PROJECT_ID", firebaseProjectId);
        model.addAttribute("FIREBASE_STORAGE_BUCKET", firebaseStorageBucket);
        model.addAttribute("FIREBASE_SENDER_ID", firebaseSenderId);
        model.addAttribute("FIREBASE_APP_ID", firebaseAppId);
        model.addAttribute("FIREBASE_MEASUREMENT_ID", firebaseMeasurementId);
    }
}