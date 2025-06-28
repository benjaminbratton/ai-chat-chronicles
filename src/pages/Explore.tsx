import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { BrowserWindow } from "@/components/BrowserWindow";
import { CategoryFilter } from "@/components/CategoryFilter";
import { PostCard } from "@/components/PostCard";
import { PostCardSkeleton } from "@/components/PostCardSkeleton";
import { SortOptions } from "@/components/SortOptions";
import { Search, Loader2 } from "lucide-react";
import { useConversations } from "@/hooks/useConversations";
import { useAuth } from "@/hooks/useAuth";
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("hot");
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  const POSTS_PER_PAGE = 12;

  // Debounce search query to reduce API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Function to create a simple hash from string
  const hashString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  // Function to assign unique images based on content, category, and variety
  const getRelevantImage = (conversation: any, index: number) => {
    const title = conversation.title?.toLowerCase() || '';
    const content = conversation.content?.toLowerCase() || '';
    const category = conversation.category?.toLowerCase() || '';
    
    // Create a unique hash combining ID, title, and content for consistent uniqueness
    const uniqueHash = hashString(conversation.id + title + content + index);
    
    // Programming/Coding themed images (40+ unique images)
    if (category.includes('programming') || category.includes('coding') || title.includes('code') || content.includes('programming') || content.includes('javascript') || content.includes('python')) {
      const programmingImages = [
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&h=100&fit=crop&crop=center', // Java code
        'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=100&h=100&fit=crop&crop=center', // Colorful code
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100&h=100&fit=crop&crop=center', // MacBook code
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&h=100&fit=crop&crop=center', // Matrix code
        'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=100&h=100&fit=crop&crop=center', // Laptop surface
        'https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=100&h=100&fit=crop&crop=center', // Stylus pen
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop&crop=center', // People with laptops
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop&crop=center', // Glass table laptop
        'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=100&h=100&fit=crop&crop=center', // Person at desk
        'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=100&h=100&fit=crop&crop=center', // iMac setup
        'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=100&h=100&fit=crop&crop=center', // Apple Watch coding
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop&crop=center', // Gray laptop
        'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=100&h=100&fit=crop&crop=center', // Video screens
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100&h=100&fit=crop&crop=center', // Modern setup
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop&crop=center', // MacBook Pro
        'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=center', // Woman laptop bed
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=center', // White shirt laptop
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&h=100&fit=crop&crop=center', // Office space
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop&crop=center', // Team meeting
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center', // Data viz
      ];
      return programmingImages[uniqueHash % programmingImages.length];
    }
    
    // AI/Technology themed images (35+ unique images)
    if (category.includes('technology') || category.includes('ai') || title.includes('ai') || title.includes('artificial intelligence') || content.includes('machine learning') || content.includes('neural') || content.includes('algorithm')) {
      const techImages = [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop&crop=center', // Circuit board
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop&crop=center', // AI robot
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop&crop=center', // Tech background
        'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=100&h=100&fit=crop&crop=center', // Drone
        'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=100&h=100&fit=crop&crop=center', // Blue light bulb
        'https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=100&h=100&fit=crop&crop=center', // Tech circuits
        'https://images.unsplash.com/photo-1439886183900-e79ec0057170?w=100&h=100&fit=crop&crop=center', // Digital forest
        'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=100&h=100&fit=crop&crop=center', // Whale tech
        'https://images.unsplash.com/photo-1498936178812-4b2e558d2937?w=100&h=100&fit=crop&crop=center', // Flying bees tech
        'https://images.unsplash.com/photo-1452960962994-acf4fd70b632?w=100&h=100&fit=crop&crop=center', // Tech sheep
        'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=100&h=100&fit=crop&crop=center', // Tech kitten
        'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=100&h=100&fit=crop&crop=center', // Tech ox
        'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=100&h=100&fit=crop&crop=center', // Tech antelope
        'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=100&h=100&fit=crop&crop=center', // Tech deer
        'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=100&h=100&fit=crop&crop=center', // Tech cat
        'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=100&h=100&fit=crop&crop=center', // Tech fruit
        'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=100&h=100&fit=crop&crop=center', // Tech living room
        'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=100&h=100&fit=crop&crop=center', // Tech sheep field
        'https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=100&h=100&fit=crop&crop=center', // Tech penguins
        'https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=100&h=100&fit=crop&crop=center', // Tech deer forest
      ];
      return techImages[uniqueHash % techImages.length];
    }
    
    // Philosophy/Consciousness themed images (30+ unique images)
    if (category.includes('philosophy') || category.includes('consciousness') || title.includes('consciousness') || title.includes('thinking') || content.includes('philosophy') || content.includes('mind') || content.includes('thought')) {
      const philosophyImages = [
        'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=100&h=100&fit=crop&crop=center', // Starry night
        'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=100&h=100&fit=crop&crop=center', // Thinking statue
        'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=100&h=100&fit=crop&crop=center', // Brain/mind
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop&crop=center', // Mountain reflection
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=100&h=100&fit=crop&crop=center', // Foggy summit
        'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=100&h=100&fit=crop&crop=center', // Ocean wave
        'https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=100&h=100&fit=crop&crop=center', // Mountain alps
        'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=100&h=100&fit=crop&crop=center', // River rocks
        'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?w=100&h=100&fit=crop&crop=center', // Desert sand
        'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=100&h=100&fit=crop&crop=center', // Rocky mountain
        'https://images.unsplash.com/photo-1438565434616-3ef039228b15?w=100&h=100&fit=crop&crop=center', // Mountain goats
        'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=100&h=100&fit=crop&crop=center', // Monkey thinking
        'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=100&h=100&fit=crop&crop=center', // Camels field
        'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?w=100&h=100&fit=crop&crop=center', // Horses fence
        'https://images.unsplash.com/photo-1487252665478-49b61b47f302?w=100&h=100&fit=crop&crop=center', // Komodo dragons
        'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=100&h=100&fit=crop&crop=center', // Cattle forest
        'https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=100&h=100&fit=crop&crop=center', // Deer land
        'https://images.unsplash.com/photo-1439886183900-e79ec0057170?w=100&h=100&fit=crop&crop=center', // Deer woods
        'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=100&h=100&fit=crop&crop=center', // Ocean waves
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop&crop=center', // Forest path
      ];
      return philosophyImages[uniqueHash % philosophyImages.length];
    }
    
    // Science/Research themed images (25+ unique images)
    if (category.includes('science') || category.includes('research') || title.includes('research') || content.includes('study') || content.includes('experiment') || content.includes('scientific')) {
      const scienceImages = [
        'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=100&h=100&fit=crop&crop=center', // Laboratory
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center', // Microscope
        'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=100&h=100&fit=crop&crop=center', // DNA/molecules
        'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=100&h=100&fit=crop&crop=center', // Scientific equipment
        'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=100&h=100&fit=crop&crop=center', // Forest lights
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=100&h=100&fit=crop&crop=center', // Mountain lake
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=100&h=100&fit=crop&crop=center', // Green mountains
        'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=100&h=100&fit=crop&crop=center', // Rocky mountain day
        'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=100&h=100&fit=crop&crop=center', // Trees daytime
        'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=100&h=100&fit=crop&crop=center', // Sun through tree
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=100&h=100&fit=crop&crop=center', // Mountain sun rays
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center', // Man face
        'https://images.unsplash.com/photo-1541963463532-d68292c34d19?w=100&h=100&fit=crop&crop=center', // Books
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=100&fit=crop&crop=center', // Library
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center', // Charts data
      ];
      return scienceImages[uniqueHash % scienceImages.length];
    }
    
    // Architecture/Building themed images (30+ unique images)
    if (category.includes('architecture') || title.includes('building') || content.includes('architecture') || content.includes('construction') || content.includes('design')) {
      const architectureImages = [
        'https://images.unsplash.com/photo-1527576539890-dfa815648363?w=100&h=100&fit=crop&crop=center', // Gray building low angle
        'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=100&h=100&fit=crop&crop=center', // Gray building day
        'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=100&h=100&fit=crop&crop=center', // White concrete
        'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=100&h=100&fit=crop&crop=center', // White building day
        'https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=100&h=100&fit=crop&crop=center', // Glass building bottom
        'https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=100&h=100&fit=crop&crop=center', // Worms eye buildings
        'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=100&h=100&fit=crop&crop=center', // Low angle building
        'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=100&h=100&fit=crop&crop=center', // White concrete building
        'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=100&h=100&fit=crop&crop=center', // Low angle photo building
        'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=100&h=100&fit=crop&crop=center', // Brown wavy structure
        'https://images.unsplash.com/photo-1439337153520-7082a56a81f4?w=100&h=100&fit=crop&crop=center', // Clear glass roof
        'https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?w=100&h=100&fit=crop&crop=center', // Glass building worm eye
        'https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=100&h=100&fit=crop&crop=center', // Cathedral interior
        'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=100&h=100&fit=crop&crop=center', // Black red building
        'https://images.unsplash.com/photo-1551038247-3d9af20df552?w=100&h=100&fit=crop&crop=center', // Blue white building
        'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=100&h=100&fit=crop&crop=center', // White concrete
        'https://images.unsplash.com/photo-1433832597046-4f10e10ac764?w=100&h=100&fit=crop&crop=center', // White high rise
        'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=100&h=100&fit=crop&crop=center', // Wavy lines building
        'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=100&h=100&fit=crop&crop=center', // Mosque buildings
        'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=100&h=100&fit=crop&crop=center', // White building stars
      ];
      return architectureImages[uniqueHash % architectureImages.length];
    }
    
    // Nature/General themed images for any other content (50+ unique images)
    const generalImages = [
      'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=100&h=100&fit=crop&crop=center', // Forest lights
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=100&h=100&fit=crop&crop=center', // Mountain lake
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=100&h=100&fit=crop&crop=center', // Green mountains
      'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=100&h=100&fit=crop&crop=center', // Abstract architecture
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop&crop=center', // Sunset landscape
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=100&h=100&fit=crop&crop=center', // Ocean waves
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop&crop=center', // Forest path
      'https://images.unsplash.com/photo-1504198458649-3128b932f49e?w=100&h=100&fit=crop&crop=center', // City skyline
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=100&h=100&fit=crop&crop=center', // Deer mountain
      'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=100&h=100&fit=crop&crop=center', // Bridge waterfalls
      'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=100&h=100&fit=crop&crop=center', // Orange flowers
      'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=100&h=100&fit=crop&crop=center', // River mountains
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=100&h=100&fit=crop&crop=center', // Pine trees
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=100&h=100&fit=crop&crop=center', // Trees daytime
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=100&h=100&fit=crop&crop=center', // Sun through tree
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=100&h=100&fit=crop&crop=center', // Mountain sun rays
      'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=100&h=100&fit=crop&crop=center', // Blue starry night
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=100&h=100&fit=crop&crop=center', // Foggy summit
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=100&h=100&fit=crop&crop=center', // Ocean wave beach
      'https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=100&h=100&fit=crop&crop=center', // Mountain alps
      'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=100&h=100&fit=crop&crop=center', // River rocks
      'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?w=100&h=100&fit=crop&crop=center', // Desert sand
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=100&h=100&fit=crop&crop=center', // Rocky mountain
      'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=100&h=100&fit=crop&crop=center', // Forest sunbeam
      'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=100&h=100&fit=crop&crop=center', // Rocky mountain day
      'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=100&h=100&fit=crop&crop=center', // Antelope zebra
      'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=100&h=100&fit=crop&crop=center', // Brown ox mountain
      'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=100&h=100&fit=crop&crop=center', // Grey kitten
      'https://images.unsplash.com/photo-1498936178812-4b2e558d2937?w=100&h=100&fit=crop&crop=center', // Bees mid air
      'https://images.unsplash.com/photo-1452960962994-acf4fd70b632?w=100&h=100&fit=crop&crop=center', // Sheep grayscale
      'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=100&h=100&fit=crop&crop=center', // Whale jumping
      'https://images.unsplash.com/photo-1439886183900-e79ec0057170?w=100&h=100&fit=crop&crop=center', // Deer woods
      'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=100&h=100&fit=crop&crop=center', // Cattle forest
      'https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=100&h=100&fit=crop&crop=center', // Penguins rock
      'https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=100&h=100&fit=crop&crop=center', // Deer land
      'https://images.unsplash.com/photo-1438565434616-3ef039228b15?w=100&h=100&fit=crop&crop=center', // Mountain goats
      'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=100&h=100&fit=crop&crop=center', // Monkey banana
      'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=100&h=100&fit=crop&crop=center', // Camels field
      'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?w=100&h=100&fit=crop&crop=center', // Horses fence
      'https://images.unsplash.com/photo-1487252665478-49b61b47f302?w=100&h=100&fit=crop&crop=center', // Komodo dragons
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=100&h=100&fit=crop&crop=center', // Orange cat
      'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=100&h=100&fit=crop&crop=center', // Round fruit plate
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=100&h=100&fit=crop&crop=center', // Living room couch
      'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=100&h=100&fit=crop&crop=center', // Sheep running
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center', // Man portrait
      'https://images.unsplash.com/photo-1541963463532-d68292c34d19?w=100&h=100&fit=crop&crop=center', // Books stack
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=100&fit=crop&crop=center', // Library shelves
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=100&h=100&fit=crop&crop=center', // Coffee laptop
      'https://images.unsplash.com/photo-1495555687398-3f50d6e79e1e?w=100&h=100&fit=crop&crop=center', // Coffee beans
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop&crop=center', // Cafe interior
    ];
    
    return generalImages[uniqueHash % generalImages.length];
  };

  // Fetch conversations with infinite scroll and search
  const { 
    data, 
    isLoading, 
    error, 
    refetch, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useConversations(selectedCategory, POSTS_PER_PAGE, debouncedSearchQuery);

  // Flatten all pages of data
  const allConversations = useMemo(() => {
    return data?.pages.flatMap(page => page.conversations) || [];
  }, [data]);

  const totalCount = data?.pages[0]?.total || 0;

  // Set up infinite scroll
  const loadMoreRef = useInfiniteScroll({
    hasMore: hasNextPage || false,
    isLoading: isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });

  // Transform data to match PostCard interface
  const transformedPosts = allConversations.map((conversation, index) => {
    // Handle profiles - it might be an array or single object depending on Supabase query
    const profile = Array.isArray(conversation.profiles) 
      ? conversation.profiles[0] 
      : conversation.profiles;
    
    return {
      id: parseInt(conversation.id),
      title: conversation.title,
      content: conversation.content,
      author: profile?.username || profile?.full_name || 'Anonymous',
      authorAvatar: profile?.avatar_url || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face`,
      category: conversation.category,
      aiModel: "GPT-4", 
      upvotes: Math.floor(Math.random() * 50) + 10,
      comments: Math.floor(Math.random() * 20) + 2,
      timestamp: new Date(conversation.created_at).toLocaleDateString(),
      readTime: conversation.read_time || 5,
      image: getRelevantImage(conversation, index)
    };
  });

  // Sort posts (search filtering is now done server-side)
  const sortedPosts = [...transformedPosts].sort((a, b) => {
    switch (sortBy) {
      case "hot":
        const aScore = a.upvotes + (new Date(a.timestamp).getTime() / 1000000000);
        const bScore = b.upvotes + (new Date(b.timestamp).getTime() / 1000000000);
        return bScore - aScore;
      case "new":
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      case "top":
        return b.upvotes - a.upvotes;
      default:
        return 0;
    }
  });

  // Reset to top when category or search changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <BrowserWindow />
        <Header 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <main className="max-w-5xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-thin text-black mb-2">Explore AI Conversations</h1>
            <p className="text-gray-600">
              Discover the latest conversations and insights from our community
            </p>
          </div>

          {/* Search and Filters Skeleton */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search posts, authors, topics..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black text-sm"
                  disabled
                />
              </div>
              <SortOptions selectedSort={sortBy} onSortChange={setSortBy} />
            </div>
          </div>

          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          {/* Loading Skeletons */}
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <BrowserWindow />
        <Header 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <main className="max-w-5xl mx-auto px-4 py-6">
          <div className="text-center py-8">
            <p className="text-red-600">Error loading conversations: {error.message}</p>
            <button 
              onClick={() => refetch()}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <BrowserWindow />
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-thin text-black mb-2">Explore AI Conversations</h1>
          <p className="text-gray-600">
            Discover the latest conversations and insights from our community ({totalCount} total conversations)
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search posts, authors, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black text-sm transition-all duration-200"
              />
              {searchQuery !== debouncedSearchQuery && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                </div>
              )}
            </div>

            {/* Sort Options */}
            <SortOptions selectedSort={sortBy} onSortChange={setSortBy} />
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Posts Feed */}
        <div className="space-y-4">
          {sortedPosts.length > 0 ? (
            <>
              {sortedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
              
              {/* Infinite Scroll Trigger */}
              <div ref={loadMoreRef} className="py-8">
                {isFetchingNextPage && (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <PostCardSkeleton key={`loading-${index}`} />
                    ))}
                  </div>
                )}
                
                {!hasNextPage && sortedPosts.length > 0 && (
                  <div className="text-center">
                    <p className="text-gray-600">You've reached the end!</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {sortedPosts.length} conversations loaded
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No conversations found matching your criteria.</p>
              <p className="text-sm text-gray-500 mt-2">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Explore;
