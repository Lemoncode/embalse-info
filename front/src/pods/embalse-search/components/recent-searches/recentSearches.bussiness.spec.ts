import { describe, it, expect, vi, beforeEach } from "vitest";
import { EmbalseSearchModel } from "../../embalse-search.vm";
import {
  addNewSearchEntry,
  getStoredSearches,
} from "./recentSearches.bussiness";

// MOCK LOCALSTORAGE

let store: Record<string, string> = {};

const localStorageMock = {
  getItem: (key: string) => store[key] || null,
  setItem: (key: string, value: string) => {
    store[key] = value.toString();
  },
  clear: () => {
    store = {};
  },
  removeItem: (key: string) => {
    delete store[key];
  },
};

Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
  writable: true,
});

describe("recentSearches business logic", () => {
  it("should add an entry to an empty list", () => {
    // ARRANGE
    const embalseList: EmbalseSearchModel[] = [];
    const newSearch: EmbalseSearchModel = {
      slug: "cenajo",
      name: "Cenajo (Albacete)",
    };

    // ACT
    const result = addNewSearchEntry(newSearch, embalseList);

    // ASSERT
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("cenajo");
  });

  it("should move a repeated element to the beginning without duplicating it", () => {

    // ARRANGE
    const embalseList: EmbalseSearchModel[] = [
      { slug: "gonzalez-lacasa", name: "González Lacasa (La Rioja)" },
      { slug: "chanza", name: "Chanza (Huelva)" },
      { slug: "cenajo", name: "Cenajo (Albacete)" },
    ];
    const newSearch: EmbalseSearchModel = {
      slug: "cenajo",
      name: "Cenajo (Albacete)",
    };

    // ACT
    const result = addNewSearchEntry(newSearch, embalseList);

    // ASSERT
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual(newSearch);
    expect(result[2].slug).toBe("chanza");
  });

  it("should add the new element to the beginning and remove the oldest one if the array has 5 elements", () => {

    // ARRANGE
    const embalseList: EmbalseSearchModel[] = [
      { slug: "gonzalez-lacasa", name: "González Lacasa (La Rioja)" },
      { slug: "chanza", name: "Chanza (Huelva)" },
      { slug: "loteta-la", name: "Loteta (La) (Zaragoza)" },
      { slug: "mequinenza", name: "Mequinenza (Zaragoza)" },
      { slug: "certescans", name: "Certescáns (Lleida)" },
    ];
    const newSearch: EmbalseSearchModel = {
      slug: "cenajo",
      name: "Cenajo (Albacete)",
    };

    // ACT
    const result = addNewSearchEntry(newSearch, embalseList);

    // ASSERT
    expect(result).toHaveLength(5);
    expect(result[0].slug).toBe(newSearch.slug);
    expect(result.some((e) => e.slug === newSearch.slug));
    expect(result[4].slug).toBe("mequinenza");
  });

  it("should add an entry to a list that already has elements but is not full", () => {

    // ARRANGE
    const embalseList: EmbalseSearchModel[] = [
      { slug: "gonzalez-lacasa", name: "González Lacasa (La Rioja)" },
    ];
    const newSearch: EmbalseSearchModel = {
      slug: "cenajo",
      name: "Cenajo (Albacete)",
    };

    // ACT
    const result = addNewSearchEntry(newSearch, embalseList);

    // ASSERT
    expect(result).toHaveLength(2);
    expect(result[0].slug).toBe("cenajo");
    expect(result[1].slug).toBe("gonzalez-lacasa");
  });
});

describe("getStoredSearches", () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it("should return an array with 5 indices", () => {

    // ARRANGE:
    localStorage.setItem(
      "recent-searches",
      JSON.stringify([
        { slug: "loteta-la", name: "Loteta (La) (Zaragoza)" },
        { slug: "gonzalez-lacasa", name: "González Lacasa (La Rioja)" },
        { slug: "chanza", name: "Chanza (Huelva)" },
        { slug: "cenajo", name: "Cenajo (Albacete)" },
        { slug: "mequinenza", name: "Mequinenza (Zaragoza)" },
      ]),
    );

    // ACT
    const result = getStoredSearches();

    // ASSERT
    expect(result).toHaveLength(5);
    expect(result[0].slug).toEqual("loteta-la");
  });

  it("should return an empty array if localStorage is empty", () => {
    // ARRANGE:
    localStorage.clear();

    // ACT
    const result = getStoredSearches();

    // ASSERT
    expect(result).toEqual([]);
  });

  it("should return an empty array when localStorage data is invalid", () => {
    // ARRANGE:
    localStorageMock.setItem("recent-searches", "invalid-data");
    const spyConsole = vi.spyOn(console, "log").mockImplementation(() => {});

    // ACT
    const result = getStoredSearches();

    // ASSERT
    expect(result).toEqual([]);
    expect(spyConsole).toHaveBeenCalled();
  });
});
